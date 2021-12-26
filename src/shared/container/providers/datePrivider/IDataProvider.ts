interface IDataProvider{
    compare(start_date: Date, end_date: Date):number;
    convertToUtc(dataAserAlterada: Date):string;
    dayNow():Date
}

export { IDataProvider }