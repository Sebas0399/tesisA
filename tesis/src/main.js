import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import Knob from 'primevue/knob';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

import DataView from 'primevue/dataview';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import "primevue/resources/themes/lara-light-indigo/theme.css";

createApp(App).use(store).use(PrimeVue).use(router)
.component("Knob",Knob)
.component("DataView",DataView)
.component("Rating",Rating)
.component("Tag",Tag)
.component("Button",Button)
.component("DataTable",DataTable)
.component("Column",Column)
.component("ColumnGroup",ColumnGroup)
.component("Row",Row)
.mount('#app')
