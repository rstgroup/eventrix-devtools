const stateHistory = [
    {"path": "init", "state": {"tasks": []}},
    {
        "path": "tasks",
        "state": {"tasks": [{"id": 0, "title": "dsad asdd asd", "status": "todo"}]},
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618159659325
    }, {
        "path": "tasks.0",
        "state": {"tasks": [{"id": 0, "title": "dsad asdd asd", "status": "done"}]},
        "receiversCount": 0,
        "listenersCount": 0,
        "timestamp": 1618159676653
    }, {
        "path": "tasks",
        "state": {"tasks": [{"id": 0, "title": "dsad asdd asd", "status": "done"}]},
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618159676653
    }, {
        "path": "tasks",
        "state": {
            "tasks": [{"id": 1, "title": "testowanie", "status": "todo"}, {
                "id": 0,
                "title": "dsad asdd asd",
                "status": "done"
            }]
        },
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618159696136
    }, {
        "path": "tasks.0",
        "state": {
            "tasks": [{"id": 1, "title": "testowanie", "status": "done"}, {
                "id": 0,
                "title": "dsad asdd asd",
                "status": "done"
            }]
        },
        "receiversCount": 0,
        "listenersCount": 0,
        "timestamp": 1618161097205
    }, {
        "path": "tasks",
        "state": {
            "tasks": [{"id": 1, "title": "testowanie", "status": "done"}, {
                "id": 0,
                "title": "dsad asdd asd",
                "status": "done"
            }]
        },
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161097206
    }, {
        "path": "tasks",
        "state": {
            "tasks": [{"id": 2, "title": "dsadsa da d", "status": "todo"}, {
                "id": 1,
                "title": "testowanie",
                "status": "done"
            }, {"id": 0, "title": "dsad asdd asd", "status": "done"}]
        },
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161306683
    }, {
        "path": "tasks",
        "state": {
            "tasks": [{"id": 3, "title": "dsadasd sdasdsd", "status": "todo"}, {
                "id": 2,
                "title": "dsadsa da d",
                "status": "todo"
            }, {"id": 1, "title": "testowanie", "status": "done"}, {
                "id": 0,
                "title": "dsad asdd asd",
                "status": "done"
            }]
        },
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161308383
    }, {
        "path": "tasks",
        "state": {
            "tasks": [{"id": 4, "title": "dasdsd sad", "status": "todo"}, {
                "id": 3,
                "title": "dsadasd sdasdsd",
                "status": "todo"
            }, {"id": 2, "title": "dsadsa da d", "status": "todo"}, {
                "id": 1,
                "title": "testowanie",
                "status": "done"
            }, {"id": 0, "title": "dsad asdd asd", "status": "done"}]
        },
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161310289
    }
];

export default stateHistory;
