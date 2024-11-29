# Gift Planner

## Team members
| Učo                                              | Name             |
|--------------------------------------------------|------------------|
| [485524](https://is.muni.cz/auth/osoba/vitenuto) | Vít Nakládal     |
| [493062](https://is.muni.cz/auth/osoba/493062)   | Dominika Blehová |
| [492892](https://is.muni.cz/auth/osoba/492892)   | Adam Krídl       |

## Official assignment
**TODO**: Paste the assignment once approved

## Local development
For a developer, it's enough to create `.env` file with connection details to the database.
You can achieve this e.g. by:
```shell
cp .env.example .env
```

## Pipeline
The CI pipeline lints the source code and verifies whether it's buildable.

## Running application
The CI pipeline together with Vercel form CI/CD pipeline. Once the code is merged into [main branch](https://github.com/akridl/gift-planner)
and CI part succeeds, the application is accessible at https://gift-planner-pv247.vercel.app/.
