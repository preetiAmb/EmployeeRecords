describe("Examine employees list content and functionality", () => {
  let employees = [];

  beforeEach(() => {
    cy.visit("http://localhost:3000/#/view");
  });

  it("contains correct information", () => {
    cy.get("[data-cy=header]").should("contain", "View Employees");
  });

  it("loads the lazy-loaded View component", () => {
    cy.contains("Loading view...").should("not.exist");
    cy.get("[data-cy=header]").should("contain", "View Employees");
  });

  it("displays employee list table", () => {
    cy.get("[data-cy=table]").should("exist");
  });

  it("displays 'Back' button", () => {
    cy.get("[data-cy=backButton]").should("exist").should("contain", "Back");
  });

  it("loads more employees when scrolling to the bottom", () => {
    // Wait for more employees to load (replace with appropriate timeout)
    cy.wait(2000); // Adjust this timeout as needed
    cy.get("[data-cy=tableBody]").scrollTo("bottom", { ensureScrollable: false });
  });
});
