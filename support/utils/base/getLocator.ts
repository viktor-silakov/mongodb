import { ElementAttribute, ElementRole } from '@parameter-types';
import { Page } from '@playwright/test';

type LocatorParams = {
    page: Page,
    role: ElementRole | 'element',
    attribute: ElementAttribute,
    value: string
}

export const getLocator = (
    {
        page,
        role,
        attribute,
        value
    }: LocatorParams
) => {
    if (role !== 'element' && attribute === 'name') {
        return page.getByRole(role, { [attribute]: value });
    }
    const parent = role === 'element' ? page : page.locator(role)
    const methods = {
        'label': () => parent.getByLabel(value),
        'tag': () => parent.locator(value),
        'text': () => {
            return parent.getByText(value)
        },
        'name': () => parent.locator(`[name=${value}]`),
        'id': () => parent.locator(`#${value}`),
        'role': () => parent.getByRole(value as Exclude<ElementRole, 'element'>),
        // 'role': () => page.getByRole(value as ElementRole),
        'selector': () => parent.locator(value),
        'placeholder': () => parent.getByPlaceholder(value),
        'test-id': () => parent.getByTestId(value),
        'title': () => parent.getByTitle(value),
        'alt-text': () => parent.getByAltText(value)
    };

    if (!methods[attribute as keyof typeof methods]) {
        throw new Error(`Unknown attribute: ${attribute}`);
    }

    return methods[attribute as keyof typeof methods]();
};