# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - generic [ref=e4]:
    - heading "Entrar" [level=1] [ref=e5]
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]: Email
        - textbox [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]: Senha
        - textbox [ref=e12]
      - generic [ref=e13]:
        - button "Entrar" [ref=e14] [cursor=pointer]
        - link "Criar conta" [ref=e15]:
          - /url: /auth/signup
    - generic [ref=e16]:
      - paragraph [ref=e17]: Não recebeu o e-mail de verificação?
      - button "Reenviar e-mail de verificação" [ref=e19] [cursor=pointer]
  - generic [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]: 🍪
      - generic [ref=e24]:
        - heading "Este site usa cookies" [level=3] [ref=e25]
        - paragraph [ref=e26]:
          - text: Usamos cookies essenciais para o funcionamento da plataforma e cookies opcionais para melhorar sua experiência. Você pode escolher quais aceitar.
          - link "Saiba mais" [ref=e27]:
            - /url: /legal/privacy
    - generic [ref=e28]:
      - button "Aceitar Todos" [ref=e29] [cursor=pointer]
      - button "Apenas Essenciais" [ref=e30] [cursor=pointer]
      - button "Gerenciar" [ref=e31] [cursor=pointer]
    - generic [ref=e32]:
      - text: Suas preferências podem ser alteradas a qualquer momento em
      - link "Configurações de Privacidade" [ref=e33]:
        - /url: /dashboard/settings/privacy
```