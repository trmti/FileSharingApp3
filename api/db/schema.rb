# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_16_120007) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "text"
    t.bigint "user_id"
    t.bigint "file_content_id"
    t.index ["file_content_id"], name: "index_comments_on_file_content_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "file_contents", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.bigint "post_id"
    t.index ["post_id"], name: "index_file_contents_on_post_id"
  end

  create_table "folders", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.bigint "post_id"
    t.bigint "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_folders_on_post_id"
    t.index ["team_id"], name: "index_folders_on_team_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "team_editors", force: :cascade do |t|
    t.bigint "editor_id"
    t.bigint "edit_team_id"
    t.index ["edit_team_id"], name: "index_team_editors_on_edit_team_id"
    t.index ["editor_id"], name: "index_team_editors_on_editor_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "post_id"
    t.string "publish_range"
    t.bigint "leader_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["leader_id"], name: "index_teams_on_leader_id"
    t.index ["post_id"], name: "index_teams_on_post_id"
  end

  create_table "teams_users", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "team_id"
    t.index ["team_id"], name: "index_teams_users_on_team_id"
    t.index ["user_id"], name: "index_teams_users_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.bigint "post_id"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["post_id"], name: "index_users_on_post_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "team_editors", "teams", column: "edit_team_id"
  add_foreign_key "team_editors", "users", column: "editor_id"
  add_foreign_key "teams", "users", column: "leader_id"
end
