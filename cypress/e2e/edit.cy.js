describe("Examine the editing of employees", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/edit/1692036973785");
  });

  it("validates empty submitted fields properly", () => {
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=firstNameErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=surnameErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=emailErrorMessage]").should("contain", "Required");
  });

  it("edits employee details successfully", () => {
    cy.get("[data-cy=firstNameInput]").clear().type("NewFirstName");
    cy.get("[data-cy=surnameInput]").clear().type("NewSurname");
    cy.get("[data-cy=emailInput]").clear().type("new.email@example.com");
    cy.get("[data-cy=birthDateInput]").clear().type("1990-01-01");
    cy.get("[data-cy=statusInput]").clear().type("ACTIVE");
    cy.get("[data-cy=jobTitleInput]").clear().type("New Developer");

    cy.get("[data-cy=saveButton]").click();
  });

  it("validates invalid email address during edit", () => {
    cy.get("[data-cy=emailInput]").clear().type("invalid-email");
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=emailErrorMessage]").should(
      "contain",
      "Invalid email address"
    );
  });

  it("validates invalid birthDate format properly", () => {
    cy.get("[data-cy=birthDateInput]").type("invalid-date-format");
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=birthDateErrorMessage]").should(
      "contain",
      "Date must be in the format YYYY-MM-DD"
    );
  });
});
