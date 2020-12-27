import Vuex from "vuex"
import { createLocalVue, mount } from "@vue/test-utils"
import ComponentWithButtons from "@/components/ComponentWithButtons.vue"

const localVue = createLocalVue()
localVue.use(Vuex)

const mutations = {
  testMutation: jest.fn()
}

const store = new Vuex.Store({ mutations })

it("dispatch a namespaced action when button is clicked", async () => {
    const store = new Vuex.Store()
    store.dispatch = jest.fn()
  
    const wrapper = mount(ComponentWithButtons, {
        store, localVue
    })
  
    await wrapper.find(".namespaced-dispatch").trigger("click")
  
    expect(store.dispatch).toHaveBeenCalledWith(
        'namespaced/very/deeply/testAction',
        { msg: "Test Namespaced Dispatch" }
    )
})