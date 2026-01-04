# Page snapshot

```yaml
- dialog "Unhandled Runtime Error" [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - navigation [ref=e7]:
          - button "previous" [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - button "next" [disabled] [ref=e11]:
            - img "next" [ref=e12]
          - generic [ref=e14]: 1 of 1 error
          - generic [ref=e15]:
            - text: Next.js (14.2.35) is outdated
            - link "(learn more)" [ref=e17] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - button "Close" [ref=e18] [cursor=pointer]:
          - img [ref=e20]
      - heading "Unhandled Runtime Error" [level=1] [ref=e23]
      - paragraph [ref=e24]: "Error: ENOENT: no such file or directory, open 'E:\\SENDA\\senda-web-app\\docs\\04_LEGAL\\TERMOS_DE_USO.md'"
    - generic [ref=e25]:
      - heading "Source" [level=2] [ref=e26]
      - generic [ref=e27]:
        - link "src\\app\\legal\\terms\\page.tsx (10:23) @ fs" [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: src\app\legal\terms\page.tsx (10:23) @ fs
          - img [ref=e31]
        - generic [ref=e35]: 8 | // Ler arquivo markdown 9 | const filePath = path.join(process.cwd(), 'docs', '04_LEGAL', 'TERMOS_DE_USO.md'); > 10 | const fileContent = fs.readFileSync(filePath, 'utf8'); | ^ 11 | 12 | // Converter markdown para HTML 13 | const processedContent = await remark()
      - heading "Call Stack" [level=2] [ref=e36]
      - button "Show collapsed frames" [ref=e37] [cursor=pointer]
```