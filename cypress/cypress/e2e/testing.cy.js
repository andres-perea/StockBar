describe("Testing del sistema de inventario", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:5173");
    cy.url().should("include", "localhost:5173");
  });

  it("Debe realizar CRUD correctamente", () => {
    cy.get("#nombreUsuario").type("andresPerea").wait(500);
    cy.get("#contrasena").type("123789").wait(500);
    cy.get("#btnIngresar").click().wait(1000);
    cy.get("#btnBebidas").click();

    cy.visit("http://localhost:5173/agregarBebida").wait(1000);
    cy.get("#bebidaNombre").type("Ron de Caldas").wait(1000);
    cy.get("#bebidaCantidad").type("20").wait(1000);
    cy.get("#bebidaPrecio").type("3500").wait(1000);
    cy.get("#bebidaDescripcion")
      .type(
        "La fórmula del Ron Viejo fue creación del cubano de origen catalán, Ramón Badía"
      )
      .wait(1000);

    cy.get("#bebidaCategoria").select("Picantico").wait(1000);
    cy.get("#btnAgregar").click();
  });
});
