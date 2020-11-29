const head = {
    state: {
        count : 10,
        isCollapse :  false  //|| JSON.parse(localStorage.navState) 
      },
      mutations: {
        set_count(state,value){
          state.count = value;
          console.log(state.count);
        },
        set_nav(state){
          state.isCollapse = !state.isCollapse;
          localStorage.navState = JSON.stringify(state.isCollapse)
        }
      },
      actions: {},
      modules: {}
}
export default head;