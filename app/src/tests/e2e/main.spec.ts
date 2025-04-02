import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    sessionStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });
    return true;
  });
  await page.reload();
  await page.waitForTimeout(1000);

  try {
    while ((await page.getByTestId("remove-todo-button").count()) > 0) {
      await page.getByTestId("remove-todo-button").first().click();
      await page.waitForTimeout(300);
    }
  } catch (e) {
    console.log("Erreur:", e);
  }
});

const TODO_ITEMS = [
  "Acheter des cookies",
  "Nourrir le chat (pas avec les cookies)",
] as const;

test.describe("UI tests", () => {
  test("Devrait permettre d'ajouter des tâches", async ({ page }) => {
    await page.waitForSelector('[data-testid="new-todo-button"]');
    await page.getByTestId("new-todo-button").click();
    await page.waitForSelector('[data-testid="new-todo-input"]');
    await page.getByTestId("new-todo-input").fill(TODO_ITEMS[0]);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(TODO_ITEMS[0])).toBeVisible();

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(TODO_ITEMS[1]);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(TODO_ITEMS[0])).toBeVisible();
    await expect(page.getByText(TODO_ITEMS[1])).toBeVisible();
  });

  test("Devrait permettre de supprimer des tâches", async ({ page }) => {
    const uniqueTaskName = `Tâche à supprimer ${Date.now()}`;

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(uniqueTaskName);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(uniqueTaskName)).toBeVisible();

    const todoWithText = page.locator('[data-testid="todo-element"]', {
      hasText: uniqueTaskName,
    });

    const removeButton = todoWithText.locator(
      '[data-testid="remove-todo-button"]'
    );
    await removeButton.click();
    await page.waitForTimeout(1000);

    await expect(page.getByText(uniqueTaskName)).not.toBeVisible();
  });

  test("Devrait permettre de marquer une tâche comme terminée", async ({
    page,
  }) => {
    const uniqueTaskName = `Tâche à terminer ${Date.now()}`;

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(uniqueTaskName);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(uniqueTaskName)).toBeVisible();

    const todoWithText = page.locator('[data-testid="todo-element"]', {
      hasText: uniqueTaskName,
    });
    const checkbox = todoWithText.locator('[data-testid="todo-checkbox"]');
    await checkbox.click();
    await page.waitForTimeout(500);

    const completedTodoElement = page.locator('[data-testid="todo-element"]', {
      hasText: uniqueTaskName,
    });

    const completedLabel = completedTodoElement.locator(
      '[data-testid="completed-todo-label"]'
    );
    const completedStatus = completedTodoElement.locator(
      '[data-testid="completed-todo-status"]'
    );

    await expect(completedLabel).toBeVisible();
    await expect(completedStatus).toBeVisible();
  });

  test("Devrait permettre de filtrer les tâches", async ({ page }) => {
    const uniqueTaskTodo = `Tâche à faire ${Date.now()}`;
    const uniqueTaskInProgress = `Tâche en cours ${Date.now()}`;

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(uniqueTaskTodo);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(uniqueTaskInProgress);
    await page.getByTestId("todo-status-select").selectOption("EN COURS");
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(uniqueTaskTodo)).toBeVisible();
    await expect(page.getByText(uniqueTaskInProgress)).toBeVisible();

    await page.waitForSelector('[data-testid="todo-filters"]');
    const filterButton = page.locator("button", { hasText: "À FAIRE" });
    await filterButton.click();
    await page.waitForTimeout(500);

    await expect(page.getByText(uniqueTaskTodo)).toBeVisible();
    await expect(page.getByText(uniqueTaskInProgress)).not.toBeVisible();
  });

  test("Devrait permettre de rechercher des tâches", async ({ page }) => {
    const uniqueTaskName1 = `Tâche unique ${Date.now()}`;
    const uniqueTaskName2 = `Autre tâche ${Date.now()}`;

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(uniqueTaskName1);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(uniqueTaskName2);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(uniqueTaskName1)).toBeVisible();
    await expect(page.getByText(uniqueTaskName2)).toBeVisible();

    await page.waitForSelector('[data-testid="search-todo-input"]');
    await page.getByTestId("search-todo-input").fill("unique");
    await page.waitForTimeout(500);

    await expect(page.getByText(uniqueTaskName1)).toBeVisible();
    await expect(page.getByText(uniqueTaskName2)).not.toBeVisible();
  });

  test("Devrait permettre de modifier une tâche", async ({ page }) => {
    const uniqueTaskName = `Tâche à modifier ${Date.now()}`;
    const modifiedTaskName = `Tâche modifiée ${Date.now()}`;

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill(uniqueTaskName);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(uniqueTaskName)).toBeVisible();

    const todoWithText = page.locator('[data-testid="todo-element"]', {
      hasText: uniqueTaskName,
    });
    const editButton = todoWithText.locator('[data-testid="edit-todo-button"]');
    await editButton.click();
    await page.waitForSelector('[data-testid="new-todo-input"]');
    await page.getByTestId("new-todo-input").fill(modifiedTaskName);
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByText(modifiedTaskName)).toBeVisible();
    await expect(page.getByText(uniqueTaskName)).not.toBeVisible();
  });

  test("Devrait afficher correctement la progression des tâches", async ({
    page,
  }) => {
    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill("Tâche 1");
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill("Tâche 2");
    await page.getByTestId("todo-status-select").selectOption("EN COURS");
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await page.getByTestId("new-todo-button").click();
    await page.getByTestId("new-todo-input").fill("Tâche 3");
    await page.getByTestId("todo-status-select").selectOption("FAIT");
    await page.getByTestId("submit-new-todo-button").click();
    await page.waitForTimeout(500);

    await expect(page.getByTestId("todo-progress-container")).toBeVisible();
    await expect(page.getByTestId("completed-tasks")).toBeVisible();
    await expect(page.getByTestId("in-progress-tasks")).toBeVisible();
    await expect(page.getByTestId("todo-tasks")).toBeVisible();
    await expect(page.getByTestId("percentage-complete")).toBeVisible();
  });

  test("Devrait afficher un message quand la liste de tâches est vide", async ({
    page,
  }) => {
    while ((await page.getByTestId("remove-todo-button").count()) > 0) {
      await page.getByTestId("remove-todo-button").first().click();
      await page.waitForTimeout(300);
    }

    await expect(page.getByTestId("empty-todo-message")).toBeVisible();
    await expect(page.getByTestId("empty-todo-message")).toContainText(
      "Aucune tâche"
    );
  });
});
