describe("Testing del sistema de inventario", () => {
  beforeEach("Poner a prueba el sistema de inventario hecho con javaScript", () => {
    cy.visit("http://localhost:5173");
    cy.url();
  });
  it("Mostrar haga CRUD correctamente", () => {
    cy.clock(Date.now(), ['Date']);
    cy.viewport(1024, 768)
    cy.get("[id='nombreUsuario']").type("andresPerea");
    cy.get("[id='contrasena']").type("123789");
    cy.get("[id='btnIngresar']").click();
    cy.get("[id='btnBebidas']").click();
  })
});
