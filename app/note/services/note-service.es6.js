export function NoteService(Note) {
    this.tree = () => {
       // var notes = Note.find();
       // return notes;
        
        return [
            {
                "id": 1,
                "title": "1. dragon-breath",
                "items": []
            },
            {
                "id": 2,
                "title": "2. moiré-vision",
                "items": [
                {
                    "id": 21,
                    "title": "2.1. tofu-animation",
                    "items": [
                    {
                        "id": 211,
                        "title": "2.1.1. spooky-giraffe",
                        "items": []
                    },
                    {
                        "id": 212,
                        "title": "2.1.2. bubble-burst",
                        "items": []
                    }
                    ]
                },
                {
                    "id": 22,
                    "title": "2.2. barehand-atomsplitting",
                    "items": []
                }
                ]
            },
            {
                "id": 3,
                "title": "3. unicorn-zapper",
                "items": []
            },
            {
                "id": 4,
                "title": "4. romantic-transclusion",
                "items": []
            }
        ];
    };
}
