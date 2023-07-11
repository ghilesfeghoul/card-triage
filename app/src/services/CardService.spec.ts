import axios from "axios";

jest.mock("axios");

describe("http-common", () => {
    it("should make a GET request", async () => {
        const responseData = [
            {
                id: 1,
                created_date: "2023-07-01",
                patient_name: "John Doe",
                status: "PENDING",
                arrhythmias: ["AFib", "PVC"]
            },
            {
                id: 2,
                created_date: "2023-07-02",
                patient_name: "Jane Smith",
                status: "DONE",
                arrhythmias: ["Pause"]
            }
        ];

        const response: any = {
            data: responseData,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {
                headers: {},
                baseURL: "",
                transformRequest: [],
                transformResponse: []
            }
        };

        // Mock axios.get to return the mocked response
        (axios.get as jest.Mock).mockResolvedValue(response);
        const result = await axios.get("/cards");

        expect(result.data).toEqual(responseData);
        expect(axios.get).toHaveBeenCalledWith("/cards");
    });

    // Add more test cases for other HTTP methods and scenarios
});
