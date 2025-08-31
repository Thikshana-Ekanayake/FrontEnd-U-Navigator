import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

export async function getDistrictById(id) {
    const { data } = await api.get(endpoints.district.byId(id));
    return { id: data.id, name: data.name, metaCode: data.metaCode };
}

export async function getDistrictMap(ids) {
    const uniq = [...new Set(ids.filter(Boolean))];
    const results = await Promise.all(
        uniq.map((id) => getDistrictById(id).catch(() => null))
    );
    const map = new Map();
    results.forEach((d) => { if (d) map.set(d.id, d); });
    return map; // Map<districtId, {id,name,metaCode}>
}
