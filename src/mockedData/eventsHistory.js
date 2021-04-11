const eventsHistory = [
    {
        "name": "setState:tasks",
        "data": [{"id": 0, "title": "dsad asdd asd", "status": "todo"}],
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618159659325
    }, {
        "name": "tasks:create",
        "data": {"task": {"id": 0, "title": "dsad asdd asd", "status": "todo"}},
        "receiversCount": 1,
        "listenersCount": 0,
        "timestamp": 1618159659325
    }, {
        "name": "setState:tasks.0",
        "data": {"id": 0, "title": "dsad asdd asd", "status": "done"},
        "receiversCount": 0,
        "listenersCount": 0,
        "timestamp": 1618159676653
    }, {
        "name": "setState:tasks",
        "data": [{"id": 0, "title": "dsad asdd asd", "status": "done"}],
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618159676653
    }, {
        "name": "tasks:markAsDone",
        "data": {"id": 0},
        "receiversCount": 1,
        "listenersCount": 0,
        "timestamp": 1618159676655
    }, {
        "name": "setState:tasks",
        "data": [{"id": 1, "title": "testowanie", "status": "todo"}, {
            "id": 0,
            "title": "dsad asdd asd",
            "status": "done"
        }],
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618159696136
    }, {
        "name": "tasks:create",
        "data": {"task": {"id": 1, "title": "testowanie", "status": "todo"}},
        "receiversCount": 1,
        "listenersCount": 0,
        "timestamp": 1618159696136
    }, {
        "name": "setState:tasks.0",
        "data": {"id": 1, "title": "testowanie", "status": "done"},
        "receiversCount": 0,
        "listenersCount": 0,
        "timestamp": 1618161097205
    }, {
        "name": "setState:tasks",
        "data": [{"id": 1, "title": "testowanie", "status": "done"}, {
            "id": 0,
            "title": "dsad asdd asd",
            "status": "done"
        }],
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161097206
    }, {
        "name": "tasks:markAsDone",
        "data": {"id": 1},
        "receiversCount": 1,
        "listenersCount": 0,
        "timestamp": 1618161097207
    }, {
        "name": "setState:tasks",
        "data": [{"id": 2, "title": "dsadsa da d", "status": "todo"}, {
            "id": 1,
            "title": "testowanie",
            "status": "done"
        }, {"id": 0, "title": "dsad asdd asd", "status": "done"}],
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161306683
    }, {
        "name": "tasks:create",
        "data": {"task": {"id": 2, "title": "dsadsa da d", "status": "todo"}},
        "receiversCount": 1,
        "listenersCount": 0,
        "timestamp": 1618161306683
    }, {
        "name": "setState:tasks",
        "data": [{"id": 3, "title": "dsadasd sdasdsd", "status": "todo"}, {
            "id": 2,
            "title": "dsadsa da d",
            "status": "todo"
        }, {"id": 1, "title": "testowanie", "status": "done"}, {"id": 0, "title": "dsad asdd asd", "status": "done"}],
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161308383
    }, {
        "name": "tasks:create",
        "data": {"task": {"id": 3, "title": "dsadasd sdasdsd", "status": "todo"}},
        "receiversCount": 1,
        "listenersCount": 0,
        "timestamp": 1618161308383
    }, {
        "name": "setState:tasks",
        "data": [{"id": 4, "title": "dasdsd sad", "status": "todo"}, {
            "id": 3,
            "title": "dsadasd sdasdsd",
            "status": "todo"
        }, {"id": 2, "title": "dsadsa da d", "status": "todo"}, {
            "id": 1,
            "title": "testowanie",
            "status": "done"
        }, {"id": 0, "title": "dsad asdd asd", "status": "done"}],
        "receiversCount": 0,
        "listenersCount": 2,
        "timestamp": 1618161310289
    }, {
        "name": "tasks:create",
        "data": {"task": {"id": 4, "title": "dasdsd sad", "status": "todo"}},
        "receiversCount": 1,
        "listenersCount": 0,
        "timestamp": 1618161310289
    }
];

export default eventsHistory;