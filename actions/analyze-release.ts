import {defineAction} from '@agent-native/core/action';
import {readAppState} from '@agent-native/core/application-state';
import {z} from 'zod';
import {demoSteps,analyzeRelease} from '../shared/release-plan.js';
export default defineAction({description:'Analyze the current shared release draft: dependency order, cycle blockers, rollback rehearsal, irreversible-step checks and downstream blast radius. Does not deploy anything.',schema:z.object({}),readOnly:true,run:async()=>{const draft=await readAppState('relay-review:draft');return {revision:draft?.revision??0,...analyzeRelease(draft?.steps??demoSteps)};}});
