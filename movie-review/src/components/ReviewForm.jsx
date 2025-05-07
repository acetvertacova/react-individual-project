import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import schema from "../validation/review.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as movieApi from '../api/movie/movie';
import { toast } from "react-toastify";
import { useRef } from "react";

function UndoNotification({ closeToast }) {
    const handleUndo = () => {
        closeToast(true);
    };

    return (
        <div className="flex items-center w-full">
            <span>Deleting Review</span>{" "}
            <button
                className="border border-purple-400 ml-auto px-2 rounded-md text-purple-400"
                onClick={handleUndo}
            >
                Undo
            </button>
            <button
                className="border border-red-400 ml-auto px-2 rounded-md text-red-400"
                onClick={() => closeToast(false)}
            >
                Create
            </button>
        </div>
    );
}

export default function ReviewForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const toastId = useRef(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { fields: genreFields, append: appendGenre, remove: removeGenre } = useFieldArray({
        control,
        name: "genre",
    });

    const { fields: actorFields, append: appendActor, remove: removeActor } = useFieldArray({
        control,
        name: "actors",
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: "tags",
    });

    useEffect(() => {
        setError(null);
        if (id) {
            const fetchReviewData = async () => {
                const data = await movieApi.getMovieById(id);
                reset({
                    title: data.title,
                    reviewTitle: data.reviewTitle,
                    reviewText: data.reviewText,
                    director: data.director,
                    genre: data.genre,
                    rating: data.rating,
                    actors: data.actors || [],
                    tags: data.tags || [],
                    posterUrl: data.posterUrl,
                    year: data.year,
                });
            };
            fetchReviewData();
        }
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            if (id) {
                await movieApi.updateMovie(id, data);
                toast.success("Review updated successfully!", {
                    autoClose: 1000,
                });
            } else {
                toastId.current = toast.info(
                    ({ closeToast }) => <UndoNotification closeToast={closeToast} />,
                    {
                        draggable: true,
                        autoClose: 2000,
                        onClose: async (rejected) => {
                            if (rejected) {
                                toast.info("Review creation cancelled", {
                                    type: "info",
                                    autoClose: 2000,
                                });
                                return;
                            }
                            try {
                                await movieApi.createMovie(data);
                                toast.success("Review created successfully!", {
                                    autoClose: 2000,
                                });
                                reset();
                                navigate('/');
                            } catch (err) {
                                console.error('An error occurred:', err);
                                toast.error(err.message || 'Failed to create review. Please try again.');
                            }
                        },
                        closeButton: false
                    }
                );
            }
        } catch (err) {
            console.error('An error occurred:', err);
            setError(err.message || 'Please try again later.');
            toast.error(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="posterUrl">Poster URL:</label>
                <input
                    id="posterUrl"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register("posterUrl")}
                />
                {errors.posterUrl && <div className="text-red-600 text-sm">{errors.posterUrl.message}</div>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register("title")}
                />
                {errors.title && <div className="text-red-600 text-sm">{errors.title.message}</div>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="year">Year:</label>
                <input
                    id="year"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register("year")}
                />
                {errors.year && <div className="text-red-600 text-sm">{errors.year.message}</div>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="genre">Genre:</label>
                {genreFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2 items-center">
                        <input
                            {...register(`genre.${index}`)}
                            defaultValue={field.value}
                            className="p-2 border border-gray-300 rounded-md flex-grow"
                        />
                        {errors.genre && errors.genre[index] && (
                            <p className="text-red-600 text-sm">{errors.genre[index].message}</p>
                        )}
                        <button
                            type="button"
                            onClick={() => removeGenre(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => appendGenre("")}
                    className="mt-2 px-4 py-2 bg-[#A9CDE5] text-[#064E2D] rounded-md"
                >
                    Add Genre
                </button>
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="director">Director:</label>
                <input
                    id="director"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register("director")}
                />
                {errors.director && <div className="text-red-600 text-sm">{errors.director.message}</div>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="actors">Actors:</label>
                {actorFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2 items-center">
                        <input
                            {...register(`actors.${index}`)}
                            defaultValue={field.value}
                            className="p-2 border border-gray-300 rounded-md flex-grow"
                        />
                        {errors.actors && errors.actors[index] && (
                            <p className="text-red-600 text-sm">{errors.actors[index].message}</p>
                        )}
                        <button
                            type="button"
                            onClick={() => removeActor(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => appendActor("")}
                    className="mt-2 px-4 py-2 bg-[#A9CDE5] text-[#064E2D] rounded-md"
                >
                    Add Actor
                </button>
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="reviewTitle">Review Title:</label>
                <input
                    id="reviewTitle"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register("reviewTitle")}
                />
                {errors.reviewTitle && <div className="text-red-600 text-sm">{errors.reviewTitle.message}</div>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="reviewText">Review Description:</label>
                <textarea
                    id="reviewText"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register("reviewText")}
                />
                {errors.reviewText && <div className="text-red-600 text-sm">{errors.reviewText.message}</div>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="rating">Rating (out of 10):</label>
                <input
                    id="rating"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register("rating")}
                />
                {errors.rating && <div className="text-red-600 text-sm">{errors.rating.message}</div>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-[#064E2D]" htmlFor="tags">Tags:</label>
                {tagFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2 items-center">
                        <input
                            {...register(`tags.${index}`)}
                            defaultValue={field.value}
                            className="p-2 border border-gray-300 rounded-md flex-grow"
                        />
                        {errors.tags && errors.tags[index] && (
                            <p className="text-red-600 text-sm">{errors.tags[index].message}</p>
                        )}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => appendTag("")}
                    className="mt-2 px-4 py-2 bg-[#A9CDE5] text-[#064E2D] rounded-md"
                >
                    Add Tag
                </button>
            </div>

            <button
                type="submit"
                className="w-full py-2 mt-4 bg-[#4C9CFE] text-white rounded-md hover:bg-[#3b8cd3]"
            >
                {id ? 'Update Review' : 'Create Review'}
            </button>
        </form>
    );
}
