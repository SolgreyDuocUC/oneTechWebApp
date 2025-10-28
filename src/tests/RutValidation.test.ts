import { describe, it, expect } from "vitest";
import { validateRut } from "@/utils/validateRut"; 

describe("Validación de RUT chileno", () => {
  it("acepta RUTs válidos", () => {
    expect(validateRut("12.345.678-5")).toBe(true);  
    expect(validateRut("9.876.543-3")).toBe(true);   
    expect(validateRut("11.111.111-1")).toBe(true);  
    expect(validateRut("20.123.456-k")).toBe(true);  
  });

  it("rechaza RUTs inválidos", () => {
    expect(validateRut("12.345.678-K")).toBe(false); 
    expect(validateRut("9.876.543-9")).toBe(false);  
    expect(validateRut("12345678")).toBe(false);     
    expect(validateRut("1234")).toBe(false);         
  });
});
