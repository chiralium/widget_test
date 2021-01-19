
document.addEventListener("DOMContentLoaded",
    () => {
        let vue = document.createElement('script');
        vue.setAttribute('src', "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js");
        document.head.appendChild(vue);

        let styles = document.createElement('link');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', 'http://45.156.21.187/wi/style.css');
        document.head.appendChild(styles);

        let appt = document.createElement('div');
        appt.setAttribute('id', 'app');
        appt.style.display = 'none';
        document.body.appendChild(appt);

        let city = document.createElement('div');
        city.setAttribute('v-if', 'city');
        city.setAttribute('class', 'main-label');
        city.innerText = "{{ city }}";
        appt.appendChild(city);

        let city_loading = document.createElement('div');
        city_loading.setAttribute('v-else', '');
        city_loading.setAttribute('class', 'main-label');
        city_loading.innerText = "Data is loading...";
        appt.appendChild(city_loading);

        let weather = document.createElement('div');
        weather.setAttribute('v-if', 'weather_is_loaded');
        weather.setAttribute('class', 'temperature');
        appt.appendChild(weather);

        let temp_pic = document.createElement('div');
        temp_pic.setAttribute('class', 'temp-pic');
        temp_pic.innerHTML = '<img v-bind:src="icon_src"/>';
        weather.appendChild(temp_pic);

        let temp_value = document.createElement('div');
        temp_value.setAttribute('class', 'temp-value');
        temp_value.innerHTML = "" +
            "{{ temp }}, Fells {{ feels_like }}" +
            "<br>" +
            '<div style="color: darkcyan">humidity: {{ humidity }}%</div>' +
            '<div style="color: darkblue">pressure: {{ pressure }}</div>' +
            '<span style="color: blue">min: {{ tmin }}</span>' +
            '<span style="color: orange">max: {{ tmax }}</span>';
        weather.appendChild(temp_value);

        let weather_loading = document.createElement('div');
        weather_loading.setAttribute('v-else', '');
        weather_loading.setAttribute('class', 'temperature');
        appt.appendChild(weather_loading);

        setTimeout(
            () => {
                appt.style.display = 'block';
                var app = new Vue({
                    el: "#app",
                    data: {
                        city: null,
                        temp: null,
                        feels_like: null,
                        tmax: null,
                        tmin: null,
                        humidity: null,
                        pressure: null,

                        icon_src: null,

                        weather_is_loaded: false,
                    },

                    methods: {
                        get_data: function () {
                            fetch(
                                `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=da421e8a1dd13d27c7467803e6c8e91d&units=metric`,
                                {
                                    method: 'GET'
                                }
                            ).then(response => response.json())
                                .then(
                                    (weather) => {
                                        let ico = weather.weather[0].icon;
                                        this.icon_src = `http://openweathermap.org/img/wn/${ico}@2x.png`;

                                        this.temp = weather.main.temp;
                                        this.feels_like = weather.main.feels_like;
                                        this.tmax = weather.main.temp_max;
                                        this.tmin = weather.main.temp_min;
                                        this.humidity = weather.main.humidity;
                                        this.pressure = weather.main.pressure;
                                        this.weather_is_loaded = true;
                                    }
                                )
                        }
                    },

                    mounted() {
                        fetch(
                            'https://ipapi.co/json/',
                            {
                                method: 'GET'
                            }
                        ).then(response => response.json())
                            .then(
                                (data) => {
                                    this.city = data.city;
                                    this.get_data();
                                }
                            );
                    }
                });
            },
            500
        )

    }
);