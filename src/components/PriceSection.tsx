import { Field, useFormikContext } from "formik";

export default function PriceSection() {
  const { values } = useFormikContext<any>();

  return (
    <div>
      <div>
        <label className="font-semibold">Pricing Type</label>
        <div className="flex gap-4 items-center pb-2">
          <label>
            <Field type="radio" name="pricingMode" value="fixed" />
            Fixed Price
          </label>
          <label>
            <Field type="radio" name="pricingMode" value="monthly" />
            Different Monthly Prices
          </label>
        </div>
      </div>

      {values.pricingMode === "fixed" && (
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Price/per month($)</label>
          <Field
            name="pricePerMonth"
            type="text"
            className="border border-2 border-[#D0D5DD] rounded-md  "
          />
        </div>
      )}

      {values.pricingMode === "monthly" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {values.monthlyPrices.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-col bg-[#D0D5DD] p-2 text-center"
            >
              <label className="font-semibold text-[#344054]">
                {item.month}
              </label>
              <Field
                name={`monthlyPrices[${index}].price`}
                type="number"
                className="bg-white border border-2 border-[#D0D5DD] rounded-md  "
                placeholder=" 500€"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="deposit">Deposit</label>
        <Field name="deposit" type="number" className="border border-2 border-[#D0D5DD] rounded-md  " />
      </div>
    </div>
  );
}
