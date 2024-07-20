import wretch from "wretch";
import FormDataAddon from "wretch/addons/formData";
import QueryStringAddon from "wretch/addons/queryString";

// Add both addons
export const w = wretch().addon(FormDataAddon).addon(QueryStringAddon);
