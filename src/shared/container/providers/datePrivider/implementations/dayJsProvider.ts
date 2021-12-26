import { IDataProvider } from "../IDataProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayJsDateProvider implements IDataProvider{
    compare(start_date: Date, end_date: Date):number{
        const start_date_utc = this.convertToUtc(start_date);
        const end_date_utc = this.convertToUtc(end_date)
        return dayjs(end_date_utc).diff(start_date_utc, "hours")
    }

    convertToUtc(dataAserAlterada: Date): string{
        return dayjs(dataAserAlterada).utc().local().format();
    }

    dayNow():Date{
        return dayjs().toDate();
    }

}

export { DayJsDateProvider }