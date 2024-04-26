describe("TC Login - Testeo", () => {
    beforeEach("Entrar a la pagina de registro", () => {
      cy.visit("http://localhost:5173/registro");
      cy.url().should("contain", "registro");
    });
    it("Tc2: Hacer registro exitosamente", () => {;
      cy.get("[type= 'text']").type("andresSanchez");
      cy.get("[type= 'email']").type("andres@gmail.com")
      cy.get("[type= 'password']").type("123789");
      cy.get("button[type= 'submit']").click();
      cy.get("button[id= 'inicioSesion']")
      cy.visit("http://localhost:5173/login");
    });
  });
  