export class Session {
    movieId: number;
    type: string = "";
    times: string[] = [];

    constructor(movieId: number, type: string, times: string[]) {
        this.movieId = movieId;
        this.type = type;
        this.times = times;
    }
}

export class DaySchedule {
    day: string = "";
    sessions: Session[] = [];
}

export class Cinema {

    id: number;
    name: string = "";
    schedule: DaySchedule[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.schedule = [];
    }

    addSchedule(day: string, session: Session) {
        let daySchedule = this.schedule.find((daySchedule) => daySchedule.day === day);
        if (!daySchedule) {
            daySchedule = new DaySchedule();
            daySchedule.day = day;
            this.schedule.push(daySchedule);
        }
        daySchedule.sessions.push(session);
    }

    getSchedule(day: string) {
        return this.schedule.find((daySchedule) => daySchedule.day === day);
    }
}