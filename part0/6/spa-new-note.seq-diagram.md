```mermaid
sequenceDiagram
    participant browser
    participant server
    
    note over browser: spa.js creates a new note <br/> and redraws the list of notes
    note over browser: spa.js initiates a request <br/> to create the note <br/> on the server side

    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server-->>browser: 201 Created
```
