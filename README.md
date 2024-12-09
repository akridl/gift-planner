# Gift Planner
Simple database schema:
![image](https://github.com/user-attachments/assets/a467c4e9-6554-4e0a-8133-247fb8862851)

## Team members
| Učo                                              | Name             |
|--------------------------------------------------|------------------|
| [485524](https://is.muni.cz/auth/osoba/vitenuto) | Vít Nakládal     |
| [493062](https://is.muni.cz/auth/osoba/493062)   | Dominika Blehová |
| [492892](https://is.muni.cz/auth/osoba/492892)   | Adam Krídl       |

## Official assignment
**TODO**: Paste the assignment once approved

## Local development
1. Prepare connection variablescreating `.env` file with connection details to the database. For local development you can achieve this e.g. by: `cp .env.example .env`
2. Start DB via: `turso dev --db-file dev.db`
3. Update database schema via: `npm run db:push`
4. Start drizzle kit via: `npx drizzle-kit studio`
    - The DB should be now reachable and visible on https://local.drizzle.studio
5. Start application via: `npm run dev`
    - The application should be now reachable on http://localhost:3000

## Pipeline
The CI pipeline lints the source code and verifies whether it's buildable.

## Running application
The CI pipeline together with Vercel form CI/CD pipeline. Once the code is merged into [main branch](https://github.com/akridl/gift-planner)
and CI part succeeds, the application is accessible at https://gift-planner-pv247.vercel.app/.
