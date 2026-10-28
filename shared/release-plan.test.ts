import {describe,it,expect} from 'vitest';
import {analyzeRelease,demoSteps,validateSteps} from './release-plan';
describe('release planning',()=>{
 it('orders dependencies and reverses recovery',()=>{const r=analyzeRelease(demoSteps);expect(r.ready).toBe(true);expect(r.order.map(s=>s.id)).toEqual(['backup','schema','api','worker']);expect(r.rollbackOrder.map(s=>s.id)).toEqual(['worker','api','schema','backup']);expect(r.blastRadius[0]!.affected).toEqual(['api','schema','worker']);});
 it('rejects cycles and does not present a deploy order',()=>{const s=structuredClone(demoSteps);s[0]!.dependsOn=['worker'];const r=analyzeRelease(s);expect(r.ready).toBe(false);expect(r.order).toEqual([]);expect(r.cycles.length).toBeGreaterThan(0);});
 it('blocks missing recovery and irreversible unverified work',()=>{const s=structuredClone(demoSteps);s[1]!.rollback='';s[2]!.irreversible=true;s[2]!.backupVerified=false;expect(analyzeRelease(s).blocked).toHaveLength(2);});
 it('rejects unknown and duplicate dependencies',()=>{const s=structuredClone(demoSteps);s[0]!.dependsOn=['missing'];expect(()=>validateSteps(s)).toThrow();s[0]!.dependsOn=[];s[1]!.dependsOn=['backup','backup'];expect(()=>validateSteps(s)).toThrow();});
});
