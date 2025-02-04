export interface Weather {
    id?: number;
    city: string;
    date: Date;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
}

export interface WeatherResponse {
    data: [
        {
            parameter: string;
            coordinates: [
                {
                    lat: number;
                    lon: number;
                    dates: [
                        {
                            date: string;
                            value: number;
                        },
                    ]
                }
            ]
        }
    ];
}