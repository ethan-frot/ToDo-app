import {expect, test} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

const TODO_ITEMS = [
    'Buy some cookies',
    'Feed the cat (not with the cookies)',
] as const;

test.describe('New Todo', () => {
    test('Should allow me to add todo items', async ({page}) => {
        // Create 1st todo.
        // Create a new todo button locator
        const newTodoButton = page.getByTestId('new-todo-button')
        await newTodoButton.click()

        // Create a new todo input locator
        const newInputTodo = page.getByTestId('new-todo-input')
        await newInputTodo.fill(TODO_ITEMS[0]);

        // Create a new add todo button locator
        const addNewTodoButton = page.getByTestId('submit-new-todo-button')
        await addNewTodoButton.click()

        // Make sure the list only has one todo item.
        expect(page.getByText(TODO_ITEMS[0]));

        // Create 2nd todo.
        await newTodoButton.click()
        await newInputTodo.fill(TODO_ITEMS[1]);
        await addNewTodoButton.click()

        // Make sure the list now has two todo items.
        expect(page.getByText(TODO_ITEMS[1]));
    });
});

test('Should allow me to remove todo items', async ({page}) => {
    // Delete todo
    // Get the first element
    const firstTodoElement = page.getByTestId('todo-element').filter({ hasText: "Hello la todo" });

    // Get the first remove button
    const removeTodoButton = firstTodoElement.getByTestId('remove-todo-button').first()
    await removeTodoButton.click()

    // Make sure that the list now has remove the first item.
    await expect(firstTodoElement).toBeHidden();
    await expect(page.getByTestId('todo-element')).toHaveCount(1);
})