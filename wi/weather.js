<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

<div id="app">
    <div v-if="city" class="main-label">
        {{ city }}
    </div>
    <div v-else class="main-label">
        Looking for your city...
    </div>

    <div v-if="weather_is_loaded" class="temperature">
        <div class="temp-pic">
            <img v-bind:src=" icon_src "/>
        </div>
        <div class="temp-value">
            {{ temp }}, Feels: {{ feels_like }}
            <br>
            <div style="color: darkcyan">humidity: {{ humidity }}%</div>
            <div style="color: darkblue">pressure: {{ pressure }}</div>
            <span style="color: blue">min: {{ tmin }}</span>
            <span style="color: orange">max: {{ tmax }}</span>
        </div>
    </div>
    <div v-else class="temperature">
        Data is loading...
    </div>
</div>

<script>
    var app = new Vue({
        el: "#app",
        data: {
            city : null,
            temp : null,
            feels_like : null,
            tmax : null,
            tmin : null,
            humidity : null,
            pressure : null,

            icon_src : null,

            weather_is_loaded : false,
        },

        methods : {
            get_data : function() {
                fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=da421e8a1dd13d27c7467803e6c8e91d&units=metric`,
                    {
                        method : 'GET'
                    }
                ).then( response => response.json())
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
                    method : 'GET'
                }
            ).then( response => response.json() )
                .then(
                    (data) => {
                        this.city = data.city;
                        this.get_data();
                    }
                );
        }
    });
</script>


<!-- da421e8a1dd13d27c7467803e6c8e91d  -->