import {defineAction} from '@agent-native/core/action';
import {readAppState} from '@agent-native/core/application-state';
import {z} from 'zod';
import {demoSteps} from '../shared/release-plan.js';
export default defineAction({description:'Read the current shared release rehearsal draft and its revision. Nothing is deployed.',schema:z.object({}),http:{method:'GET'},readOnly:true,run:async()=>await readAppState('relay-review:draft')??{revision:0,steps:demoSteps}});
