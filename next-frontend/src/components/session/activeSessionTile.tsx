export default function ActiveSessionTile({ session }: { session: any }) {
    return (
        <div>
            <h1>Active Sessions </h1>
        </div>
    );
}


/*

src/
├── components/
│   └── session/       # Contains individual session components like ActiveSessionTile, CreateNewSession, etc.
├── factories/
│   └── SessionFactory.tsx  # Place the SessionFactory file here
├── lib/               # For utility functions, API calls, etc.
├── pages/             # Your Next.js pages
└── other folders...



*/