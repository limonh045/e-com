import { db } from "../plugins/fireinit";

const state = {
  mainMenu: [],
  subMenu: []
};
const mutations = {
  collectMainMenu(state, paylod) {
    state.mainMenu = paylod;
  },
  collectsSubMenu(state, payload) {
    state.subMenu = payload;
  }
};
const actions = {
  addMainMenu({ commit }, paylod) {
    db.database()
      .ref("mainmenu")
      .push({ name: paylod })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  addSubMenu({ commit }, payload) {
    db.database()
      .ref("submenu")
      .push(payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  async collectMainMenu({ commit }) {
    var menu = [];
    await db
      .database()
      .ref("mainmenu")
      .on("value", snapshot => {
        console.log(snapshot);
        snapshot.forEach(e => {
          menu.push({ ...e.val(), id: e.key });
        });
        commit("collectMainMenu", menu);
        menu=[]
      });
  },
  async collectSubMenu({ commit }) {
    var submenu = [];
    await db
      .database()
      .ref("submenu")
      .on("value", snapshot => {
        console.log(snapshot);
        snapshot.forEach(e => {
          submenu.push({ ...e.val(), id: e.key });
        });
        commit("collectsSubMenu", submenu);
        submenu=[];
      });
  }
};
const getters = {
  items(state) {
    
    let items = [];
    for (const key of state.mainMenu) {
      for (const sub of state.subMenu) {
        if (sub.menuid === key.id) {
          if (key.sub) {
            key.sub.push(sub);
          } else {
            key.sub = [];
            key.expan = false;
            key.sub.push(sub);
          }
        }
      }
    
    }

    items = state.mainMenu;
    return items;
  },
  mainmenu : state=> state.mainMenu,
  submenu : state=> state.subMenu
};

export default {
  state,
  mutations,
  actions,
  getters
};
