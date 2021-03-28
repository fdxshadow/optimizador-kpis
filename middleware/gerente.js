export default function ({ $auth, redirect, route, store }) {
   if(route.path!="/gerente" && store.state.obraSelect==null){
    return redirect("/gerente");
   }
}
  