import { defineParameterType } from 'playwright-bdd';

// Define a general parameter type that transforms all values to uppercase
defineParameterType({
  name: 'template',
  regexp: /.+/,  // This regex will match any non-empty string
  transformer: (s) => s.toUpperCase(),
  useForSnippets: false,  // Prevents this from being used for generating step snippets
});

export type ElementRole = "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem";
const elementRoleRegexp = /element|alert|alertdialog|application|article|banner|blockquote|button|caption|cell|checkbox|code|columnheader|combobox|complementary|contentinfo|definition|deletion|dialog|directory|document|emphasis|feed|figure|form|generic|grid|gridcell|group|heading|img|insertion|link|list|listbox|listitem|log|main|marquee|math|meter|menu|menubar|menuitem|menuitemcheckbox|menuitemradio|navigation|none|note|option|paragraph|presentation|progressbar|radio|radiogroup|region|row|rowgroup|rowheader|scrollbar|search|searchbox|separator|slider|spinbutton|status|strong|subscript|superscript|switch|tab|table|tablist|tabpanel|term|textbox|time|timer|toolbar|tooltip|tree|treegrid|treeitem/;
defineParameterType({
  name: 'role',
  regexp: elementRoleRegexp,
  transformer: (s) => s.toLowerCase() as (ElementRole | "element"),
});

export type StepActions = "focus" | "press" | "hover" | "fill" | "type" | "click" | "select" | "check" | "uncheck" | "scroll";

const stepActionsRegexp = /focus|press|hover|fill|type|type|click|check|select|check|uncheck|scroll/;

defineParameterType({
  name: 'action',
  regexp: stepActionsRegexp,
  transformer: (s) => s.toLowerCase() as StepActions,
});

export type ElementAttribute = "id" | "tag" | "label" | "text" | "name" | "value" | "selector" | "placeholder" | "test-id" | "title" | "alt-text" | "role";

const elementAttributeRegexp = /id|tag|label|text|value|name|selector|placeholder|test-id|title|alt-text|role/;
defineParameterType({
  name: 'attribute',
  regexp: elementAttributeRegexp,
  transformer: (s) => s.toLowerCase() as ElementAttribute,
});

export type Assertion = "be checked" | "not be checked" | "have text" | "not have text" | "contain text" | "not contain text" | "have value" | "not have value" | "be present" | "not be present" | "be visible" | "not be visible" | "be in viewport" | "not be in viewport" | "be focused" | "not be focused" | "be enabled" | "not be enabled" | "be editable" | "not be editable";

const assertionRegexp = /be checked|not be checked|have text|not have text|contain text|not contain text|have value|not have value|be present|not be present|be visible|not be visible|be in viewport|not be in viewport|be focused|not be focused|be enabled|not be enabled|be editable|not be editable/;

defineParameterType({
  name: 'assert',
  regexp: assertionRegexp,
  transformer: (s) => s.toLowerCase() as Assertion,
});

export type Conditions = "are visible" | "are visible" | "are present";

export const сonditionsRegexp = /are visible|are visible|are present/;

defineParameterType({
  name: 'condition',
  regexp: сonditionsRegexp,
  transformer: (s) => s.toLowerCase() as Conditions,
});


defineParameterType({
  name: 'valueType',
  regexp: /value|text/,
  transformer: s => s
});

export type Verbs = "create" | "update" | "delete" | "path";

defineParameterType({
  name: 'verbs',
  regexp: /create|update|delete|path/,
  transformer: s => s
});


defineParameterType({
  name: 'negate',
  regexp: /| not/,
  transformer: s => {
    return s.trim()
  }
});

/**
 * Defines a custom parameter type 'pattern' for Cucumber.js
 * which can handle both exact string matches and regex patterns.
 *
 * The parameter accepts strings enclosed in single quotes (') and can contain either
 * plain text or a regex pattern. If a regex pattern is provided, it will be parsed
 * into a RegExp object. Otherwise, the plain text will be converted into a RegExp
 * for exact matching.
 *
 * @example
 * // In a Gherkin step:
 * // Given I have a text 'Hello World'
 * // When I test the text 'Hello World'
 * // Then the result should be 'true'
 *
 * @example
 * // In a Gherkin step:
 * // Given I have a text '/Hello/i'
 * // When I test the text 'hello there'
 * // Then the result should be 'true'
 */
defineParameterType({
  name: 'pattern',
  regexp: /'(\/.*\/[gimsuy]*)'|'([^']*)'/,
  transformer: (regexOrString: string, plainString: string) => {
    if (regexOrString) {
      const match = regexOrString.match(/^\/(.*)\/([gimsuy]*)$/);
      if (match) {
        return new RegExp(match[1], match[2]);
      }
    }
    return new RegExp(`^${plainString}$`);
  },
  useForSnippets: false,
  preferForRegexpMatch: true,
});
