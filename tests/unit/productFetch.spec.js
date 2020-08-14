import { shallowMount, createLocalVue } from '@vue/test-utils'
import Product from '@/views/Product/Index.vue'

const localVue = createLocalVue()

const $route = {
    path: '/productos'
}
jest.mock('axios', () => ({
    get: Promise.resolve('value')
}))
// import Product from '@/views/Product/Index.vue'


describe('Should get the Product data', () => {
    const wrapper = shallowMount(Product, {
        localVue,
        mocks: {
            $route
        }
    })

})