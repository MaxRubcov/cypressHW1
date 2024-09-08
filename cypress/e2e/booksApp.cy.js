
describe('тестирование библиотеки', () => {

  beforeEach(() =>{
    cy.visit('/');
  })

  it('Авторизация', () => {
    cy.login('bropet@mail.ru', 123)
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible', true);
  })

  it('Тест на ввод пустого пароля', () =>{
    cy.login('bropet@mail.ru', )
    cy.get('#pass').then((elements) =>{
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.');
    })
  })

  it('Тест на ввод пустого email', () =>{
    cy.login("", 123)
    cy.get('#mail').then((elements) =>{
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.');
    })
  })
})
  
describe('Testing books', () => {
    beforeEach(() =>{
      cy.visit('/');
      cy.login('bropet@mail.ru', 123)
    })
        
  it('Добавлена книга', () =>{
    cy.createNewBook("Семь сказок", "А.С. Пушкин")
    cy.get(".card-title").should("contain", "Семь сказок");
    })
  
  it('Книга добавлена в избранное', () =>{
    cy.contains("Семь сказок").should("be.visible").within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.get('h4').click();
    cy.get(".card-title").should("contain", "Семь сказок");
  })

  it("Удалил из избранного", () => {
    cy.visit("/favorites");
    cy.contains("Семь сказок").should("be.visible").within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains("Семь сказок").should("not.exist");
  });
  
})