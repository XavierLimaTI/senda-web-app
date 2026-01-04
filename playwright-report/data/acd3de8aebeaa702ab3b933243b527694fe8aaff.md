# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "Entrar" [level=1] [ref=e4]
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]: Email
      - textbox [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e10]: Senha
      - textbox [ref=e11]
    - generic [ref=e12]:
      - button "Entrar" [ref=e13] [cursor=pointer]
      - link "Criar conta" [ref=e14] [cursor=pointer]:
        - /url: /auth/signup
  - generic [ref=e15]:
    - paragraph [ref=e16]: Não recebeu o e-mail de verificação?
    - button "Reenviar e-mail de verificação" [ref=e18] [cursor=pointer]
```