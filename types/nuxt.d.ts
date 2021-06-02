import Vue from 'vue'
import { Store } from 'vuex'

// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options' {
  interface NuxtContext<V extends Vue> {
    app: V
    isClient: boolean
    isServer: boolean
    isStatic: boolean
    isDev: boolean
    store: Store<any> // Consider vuex-typex in future
    env: object
    $content: Function
    params: object
    query: object
  }

  interface ComponentOptions<V extends Vue> {
    asyncData?(context: NuxtContext<V>): Promise<object> | object
    fetch?(context: NuxtContext<V>): Promise<object> | object
  }
}
