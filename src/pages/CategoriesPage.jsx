import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import request from "../server";

import "./CategoriyModal.css"

const categorySchema = yup
  .object({
    name: yup.string().required(),
    image: yup.string().url().required(),
  })
  .required();

const CategoriesPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let { data } = await request.get("category");
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  const closeModal = () => setShow(false);

  const openModal = () => {
    setSelected(null);
    setShow(true);
    reset({ name: "", image: "" });
  };

  const onSubmit = async (data) => {
    try {
      if (selected === null) {
        await request.post("category", data);
      } else {
        await request.put(`category/${selected}`, data);
      }
      getData();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const editData = async (id) => {
    try {
      setShow(true);
      setSelected(id);
      let {
        data: { name, image },
      } = await request.get(`category/${id}`);
      reset({ name, image });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    try {
      await request.delete(`category/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

  return (
    <div className="container">
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Searching..."
        />
        <span className="input-group-text">{data.length}</span>
        <button
          onClick={openModal}
          className="btn btn-outline-secondary"
          type="button"
        >
          Add
        </button>
      </div>
      <div className="categories-row row">
        {data.map((el) => (
          <div key={el.id} className="col-12 col-sm-6 col-md-6 col-lg-4 mb-3">
            <div className="card">
              <img
                src={el.image}
                className="card-img-top object-fit-cover"
                alt="..."
                height={200}
              />
              <div className="card-body">
                <h5 className="card-title">{el.name}</h5>
                <Button
                  onClick={() => deleteData(el.id)}
                  className="me-2"
                  variant="danger"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => editData(el.id)}
                  className="me-2"
                  variant="primary"
                >
                  Edit
                </Button>
                <Link to={`/categories/${el.id}`} className="btn btn-warning">
                  See products {el.id}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={show} onHide={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
          <Modal.Header closeButton>
            <Modal.Title>Category data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="image">Image</label>
              <input
                {...register("image")}
                type="url"
                id="image"
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {selected ? "Save" : "Add"} category
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
