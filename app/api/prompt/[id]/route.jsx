import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return new Response("Failed to fetch prompt", { status: 500 });
    }
}

// PATCH (Update Prompt)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt Not Found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return new Response("Failed to update prompt", { status: 500 });
    }
}

// DELETE (Delete Prompt)
export const DELETE = async (request, { params }) => {
    console.log('DELETE request received for ID:', params.id);
    try {
        await connectToDB();
        const result = await Prompt.findByIdAndDelete(params.id);
        if (result) {
            console.log('Prompt deleted successfully:', result);
            return new Response("Prompt deleted successfully", { status: 200 });
        } else {
            console.log('Prompt not found for ID:', params.id);
            return new Response("Prompt Not Found", { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
}