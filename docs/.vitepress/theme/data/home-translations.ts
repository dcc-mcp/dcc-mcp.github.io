import { inject, type ComputedRef, type InjectionKey } from 'vue'
import type copy from '../../i18n/ja/home.json'

export type HomeTranslations = typeof copy
export const homeTranslationsKey: InjectionKey<ComputedRef<HomeTranslations | undefined>> = Symbol('home translations')
export const useHomeTranslations = () => inject(homeTranslationsKey, undefined)
