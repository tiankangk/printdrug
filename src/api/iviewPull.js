import Vue from 'vue'
import {
    Card,
  Button,
  Table,
  Icon,
  Input,
  DatePicker,
  Select,
  Option,
  Modal,
  Message,
  Spin,
  Menu,
  Submenu,
  MenuGroup,
  MenuItem,
  Page,
  Upload,
  Form,
  FormItem,
} from 'iview'
import 'iview/dist/styles/iview.css';


Vue.component('Button', Button);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Card', Card);
Vue.component('Table', Table);
Vue.component('Icon', Icon);
Vue.component('Input', Input);
Vue.component('DatePicker', DatePicker);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Modal', Modal);
Vue.component('Spin', Spin);
Vue.component('Submenu', Submenu);
Vue.component('MenuGroup', MenuGroup);
Vue.component('MenuItem', MenuItem);
Vue.component('Menu', Menu);
Vue.component('Page', Page);
Vue.component('Upload', Upload);

Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
