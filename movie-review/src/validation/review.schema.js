import * as yup from 'yup';

const schema = yup
    .object({
        title: yup
            .string()
            .required("The title is required!")
            .trim(),
        year: yup
            .number()
            .required("The year is required!")
            .min(1900, "Year must be greater than or equal to 1900!")
            .max(new Date().getFullYear(), "Year must not be in the future!")
            .integer("No deciamls!"),
        genre: yup
            .array()
            .of(yup.string()
                .required("Genre are required!")
                .trim())
            .min(1, "At least one genre is required!"),
        director: yup
            .string()
            .required("The director is required!")
            .trim(),
        actor: yup
            .array()
            .of(yup.string()
                .required("Actors are required!")
                .trim())
            .min(1, "At least one actor is required!"),
        posterUrl: yup
            .string()
            .required("The poster is required!")
            .trim()
            .url("The field has to be a valid URL!"),
        reviewTitle: yup
            .string()
            .required("The review's title is required!")
            .trim(),
        reviewText: yup
            .string()
            .required("The review's description is required!")
            .min(10, "The description should consist of at least 10 symbols")
            .max(1000, "The description should consist maximum of 1000 symbols"),
        rating: yup
            .number()
            .required("The rating is required!")
            .min(0, "Rating must be at least 0")
            .max(10, "Rating cannot exceed 10")
            .integer("Please enter a whole number for the rating!"),
        tags: yup
            .array()
            .of(yup.string()
                .required("Tags are required!")
                .trim())
            .min(1, "At least one tag is required!"),
    })
    .required();
export default schema;