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
        - link "Criar conta" [ref=e15] [cursor=pointer]:
          - /url: /auth/signup
    - generic [ref=e16]:
      - paragraph [ref=e17]: Não recebeu o e-mail de verificação?
      - button "Reenviar e-mail de verificação" [ref=e19] [cursor=pointer]
```