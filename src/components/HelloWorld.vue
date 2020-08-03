<template>
  <v-layout row wrap>

    <v-flex xs12>
      <v-data-table
          :headers="headers"
          :items="desserts"
          :options.sync="options"
          :server-items-length="totalDesserts"
          :loading="loading"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="2">Filtre</v-col>
                  <v-col cols="10" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <v-row v-if="!open" no-gutters style="width: 100%">
                        <v-col cols="6">Ad Soyad: {{ filter.name || 'Not set' }}</v-col>
                        <v-col cols="6">Oluşturma Tarihi Aralığı: {{ filter.created_at || 'Not set' }}</v-col>
                      </v-row>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>

                  <v-col cols="12" md="4">
                    <v-text-field v-model="filter.name" label="Ad Soyad" clearable></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            clearable
                            v-model="filter.created_at"
                            label="Oluşturma Tarihi Aralığı"
                            append-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="filter.created_at" range></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" md="12" align="left">
                    <v-btn color="primary" tile>Filtrele</v-btn>
                    <v-btn tile>Temizle</v-btn>
                  </v-col>

                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>


        </template>
      </v-data-table>

    </v-flex>

  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        name: null,
        created_at: null
      },
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      date: null,
      menu2: false,
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      dialog: false,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Calories', value: 'calories'},
        {text: 'Fat (g)', value: 'fat'},
        {text: 'Carbs (g)', value: 'carbs'},
        {text: 'Protein (g)', value: 'protein'},
        {text: 'Iron (%)', value: 'iron'},
      ],
    }
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi()
            .then(data => {
              this.desserts = data.items
              this.totalDesserts = data.total
            })
      },
      deep: true,
    },
  },
  mounted() {
    this.getDataFromApi()
        .then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
        })
  },
  methods: {
    getDataFromApi() {
      this.loading = true
      return new Promise((resolve) => {
        const {sortBy, sortDesc, page, itemsPerPage} = this.options
        console.log(this.options);

        let items = this.getDesserts()
        const total = items.length

        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]]
            const sortB = b[sortBy[0]]

            if (sortDesc[0]) {
              if (sortA < sortB) return 1
              if (sortA > sortB) return -1
              return 0
            } else {
              if (sortA < sortB) return -1
              if (sortA > sortB) return 1
              return 0
            }
          })
        }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        }

        setTimeout(() => {
          this.loading = false
          resolve({
            items,
            total,
          })
        }, 1000)
      })
    },
    getDesserts() {
      return [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ]
    },
  },
}
</script>