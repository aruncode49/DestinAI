import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { budgetOptions } from "@/constants/budgetOptions";
import { stringConstants } from "@/constants/stringConstants";
import { travelOptions } from "@/constants/travelOptions";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

interface IPlaceOption {
    label: string;
    value: {
        description: string;
        place_id: string;
    };
}

interface IFormData {
    location: IPlaceOption | undefined;
    days: number;
    budget: string;
    traveler: string;
}

export default function CreateTripPage() {
    // state
    const [place, setPlace] = useState<IPlaceOption | null>(null);
    const [formData, setFormData] = useState<IFormData>({
        location: undefined,
        days: 0,
        budget: "",
        traveler: "",
    });

    const onInputChange = (
        name: keyof IFormData,
        value: IPlaceOption | string | number
    ) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onFormSubmit = () => {
        for (const key in formData) {
            if (!formData[key as keyof IFormData]) {
                console.log("Please fill all the fields!!");
                return;
            }
        }
    };

    return (
        <div className="my-8 mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                {stringConstants.createTripTitle}
            </h2>
            <p className="mt-2 text-gray-600">
                {stringConstants.createTripSubtitle}
            </p>
            <div className="mt-8 space-y-10">
                {/* Choose places */}
                <div className="space-y-2">
                    <p className="font-medium text-gray-600">
                        {stringConstants.destinationLabel}
                    </p>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (v) => {
                                setPlace(v);
                                onInputChange("location", v?.value);
                            },
                            placeholder: stringConstants.destinationPlaceholder,
                            styles: {
                                input: (provided) => ({
                                    ...provided,
                                    fontSize: "14px",
                                    outline: "#000",
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    fontSize: "14px",
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    fontSize: "14px",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    fontSize: "14px",
                                }),
                            },
                        }}
                    />
                </div>

                {/* Choose days */}
                <div className="space-y-2">
                    <p className="font-medium text-gray-600">
                        {stringConstants.daysLabel}
                    </p>
                    <Input
                        placeholder={stringConstants.daysPlaceholder}
                        type="number"
                        className="h-[38px]"
                        min={1}
                        max={10}
                        onChange={(e) => onInputChange("days", e.target.value)}
                    />
                </div>

                {/* Choose Budget */}
                <div className="space-y-2">
                    <p className="font-medium text-gray-600">
                        {stringConstants.budgetHeading}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {budgetOptions.map((item) => (
                            <div
                                className={`p-2 pb-3 border rounded-md space-y-2 cursor-pointer hover:shadow-md transition-all duration-100 ${
                                    formData.budget === item.title &&
                                    "border-amber-600 shadow-md"
                                }`}
                                key={item.id}
                                onClick={() =>
                                    onInputChange("budget", item.title)
                                }
                            >
                                <h1 className="text-2xl">{item.icon}</h1>
                                <h2 className="font-medium">{item.title}</h2>
                                <p className="text-sm text-gray-500">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Choose travel companion */}
                <div className="space-y-2">
                    <p className="font-medium text-gray-600">
                        {stringConstants.travelCompanionHeading}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {travelOptions.map((item) => (
                            <div
                                className={`p-2 pb-3 border rounded-md space-y-2 cursor-pointer hover:shadow-md transition-all duration-100 ${
                                    formData.traveler === item.people &&
                                    "border-amber-600 shadow-md"
                                }`}
                                key={item.id}
                                onClick={() =>
                                    onInputChange("traveler", item.people)
                                }
                            >
                                <h1 className="text-2xl">{item.icon}</h1>
                                <h2 className="font-medium">{item.title}</h2>
                                <p className="text-sm text-gray-500">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Generate Button */}
            <Button
                onClick={onFormSubmit}
                className="mt-6 bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-600 w-full sm:w-fit"
            >
                <WandSparkles />
                {stringConstants.generateTrip}
            </Button>
        </div>
    );
}
