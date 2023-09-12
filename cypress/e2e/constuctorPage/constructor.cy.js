import ingredients from "../../fixtures/ingredients.json";
import user from "../../fixtures/user.json";

const stockIngredients = '[data-testid="stock-ingredient"]';
const constructor = '[data-testid="constructor"]';
const bunsList = '[data-testid="buns-list"]';
const innersList = '[data-testid="inners-list"]';
const saucesList = '[data-testid="sauces-list"]';
const submitButton = '[data-testid="submit-order-button"]';
const closeButton = '[data-testid="modal-close-button"]';
const localhostUrl = "http://localhost:3000";

describe("burger constructor", function () {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit(localhostUrl);
    cy.intercept("GET", "api/ingredients", ingredients);
    cy.intercept("GET", "api/auth/user", user);
  });
  it("opens and closes all the ingredients modal windows", () => {
    cy.get(stockIngredients).each((element) => {
      cy.wrap(element).click();
      cy.get(closeButton).click();
    });
  });
  it("drags and drops all ingredients to the constructor", () => {
    cy.get(stockIngredients).each((element) => {
      cy.wrap(element).trigger("dragstart");
      cy.get(constructor).trigger("drop");
    });
  });
  it("creates an order with an ingredient of each type when user logged in", () => {
    cy.get(bunsList).find(stockIngredients).first().trigger("dragstart");
    cy.get(constructor).trigger("drop");
    cy.get(innersList).find(stockIngredients).first().trigger("dragstart");
    cy.get(constructor).trigger("drop");
    cy.get(saucesList).find(stockIngredients).first().trigger("dragstart");
    cy.get(constructor).trigger("drop");
    cy.get(submitButton).click();
  });
});
