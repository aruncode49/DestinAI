import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { budgetOptions } from "@/constants/budgetOptions";
import { AI_PROMPT } from "@/constants/prompt";
import { stringConstants } from "@/constants/stringConstants";
import { travelOptions } from "@/constants/travelOptions";
import { chatSession } from "@/service/aiModal";
import { WandSparkles } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import Spinner from "@/components/custom/Spinner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const GoogleLoginDialog = lazy(
    () => import("@/components/custom/GoogleLoginDialog")
);

interface IPlaceOption {
    label: string;
    value: {
        description: string;
        place_id: string;
    };
}

interface IFormData {
    days: number;
    budget: string;
    traveler: string;
}

export default function CreateTripPage() {
    // hooks
    const navigate = useNavigate();

    // state
    const [place, setPlace] = useState<IPlaceOption | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<IFormData>({
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

    const onFormSubmit = async () => {
        // custom validations
        if (!place) {
            toast.error("Please select your destination!");
            return;
        }

        for (const key in formData) {
            if (!formData[key as keyof IFormData]) {
                toast.error("All fields are required!");
                return;
            }
        }

        // check access token is present in cookies or not
        const user = localStorage.getItem("user");
        if (!user) {
            setOpen(true);
            return;
        }

        // Set loader true if it is false only...
        if (!loading) {
            setLoading(true);
        }

        // final prompt
        try {
            const prompt = AI_PROMPT.replace(
                "{totalDays}",
                formData.days.toString()
            )
                .replace("{traveler}", formData.traveler)
                .replace("{location}", place.label)
                .replace("{budget}", formData.budget);

            const result = await chatSession.sendMessage(prompt);

            // add data inside db
            const docId = Date.now().toString();
            const userData = JSON.parse(user);
            await setDoc(doc(db, "travelPlan", docId), {
                userSelection: { ...formData, place },
                generatedTravelData: JSON.parse(result.response.text()),
                userEmail: userData?.email,
                id: docId,
            });
            toast.success("Travel plan created successfully!");
            navigate(`/view/${docId}`);
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 mb-10">
            {loading && <Spinner />}
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
                            onChange: (v) => setPlace(v),
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
                                className={`p-2 pb-3 border rounded-md space-y-2 cursor-pointer shadow-md hover:shadow-xl transition-all duration-100 ${
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
                                className={`p-2 pb-3 border rounded-md space-y-2 cursor-pointer shadow-md hover:shadow-xl transition-all duration-100 ${
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
                className="mt-6 bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-600 w-full sm:w-fit text-white"
            >
                <WandSparkles />
                {stringConstants.generateTrip}
            </Button>

            {open && (
                <Suspense fallback={<Spinner />}>
                    <GoogleLoginDialog
                        onClose={() => setOpen(false)}
                        onSuccess={onFormSubmit}
                    />
                </Suspense>
            )}
        </div>
    );
}
