# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - generic [ref=e4]:
    - heading "Escolha seu perfil" [level=1] [ref=e5]
    - generic [ref=e6]:
      - link "Cliente" [ref=e7]:
        - /url: /auth/signup?role=CLIENT
      - link "Terapeuta" [ref=e8]:
        - /url: /auth/signup?role=THERAPIST
      - link "Espaço" [ref=e9]:
        - /url: /auth/signup?role=SPACE
```